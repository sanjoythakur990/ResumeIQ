import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading your resume...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to preview image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading preview...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing analysis...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Running AI analysis...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        const cleanedFeedback = feedbackText.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
        data.feedback = JSON.parse(cleanedFeedback);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete!');
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/30">
            <Navbar />

            <section className="main-section">
                {isProcessing ? (
                    <div className="flex flex-col items-center gap-8 py-16 max-w-md text-center">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-3xl primary-gradient flex items-center justify-center shadow-xl">
                                <svg className="w-12 h-12 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl mb-3">Analyzing Resume</h1>
                            <p className="text-slate-500 text-lg">{statusText}</p>
                        </div>
                        <img src="/images/resume-scan.gif" className="w-full max-w-sm rounded-2xl opacity-80" />
                    </div>
                ) : (
                    <>
                        <div className="page-heading py-8">
                            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                AI Resume Analyzer
                            </div>
                            <h1>Smart feedback for your dream job</h1>
                            <h2>Drop your resume for an ATS score and detailed improvement tips</h2>
                        </div>

                        <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-100 shadow-lg p-8">
                            <form id="upload-form" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 w-full">
                                    <div className="form-div">
                                        <label htmlFor="company-name">Company Name</label>
                                        <input type="text" name="company-name" placeholder="e.g. Google" id="company-name" />
                                    </div>
                                    <div className="form-div">
                                        <label htmlFor="job-title">Job Title</label>
                                        <input type="text" name="job-title" placeholder="e.g. Frontend Developer" id="job-title" />
                                    </div>
                                </div>

                                <div className="form-div">
                                    <label htmlFor="job-description">Job Description</label>
                                    <textarea
                                        rows={4}
                                        name="job-description"
                                        placeholder="Paste the job description here to get more targeted feedback..."
                                        id="job-description"
                                    />
                                </div>

                                <div className="form-div">
                                    <label htmlFor="uploader">Resume (PDF)</label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>

                                <button
                                    className="primary-button w-full py-3.5 text-base mt-2"
                                    type="submit"
                                    disabled={!file}
                                >
                                    {file ? 'Analyze My Resume' : 'Select a PDF to continue'}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </section>
        </main>
    )
}
export default Upload
