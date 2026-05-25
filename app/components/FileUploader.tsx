import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024;

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full" {...getRootProps()}>
            <input {...getInputProps()} />
            {file ? (
                <div className="uploader-selected-file">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-700 truncate max-w-xs">{file.name}</p>
                            <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
                        </div>
                    </div>
                    <button
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onFileSelect?.(null);
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div className={`uplader-drag-area ${isDragActive ? 'border-indigo-500 bg-indigo-50/60' : ''}`}>
                    <div className="flex flex-col items-center gap-3">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDragActive ? 'primary-gradient' : 'bg-slate-100'}`}>
                            <svg className={`w-7 h-7 ${isDragActive ? 'text-white' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-600">
                                {isDragActive ? 'Drop your PDF here' : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">PDF only · Max {formatSize(maxFileSize)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default FileUploader
