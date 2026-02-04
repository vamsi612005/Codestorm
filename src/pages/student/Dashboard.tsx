
import { useState, useRef } from "react";
import { Upload, File, CheckCircle, AlertCircle, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { API_URL } from "@/lib/api";

const Dashboard = () => {
    const { toast } = useToast();
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setIsUploading(true);
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            const res = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                headers: { "ngrok-skip-browser-warning": "true" },
                body: formData
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();

            toast({
                title: "Upload Successful",
                description: `Created collections: ${data.created_collections?.join(", ")}`,
            });
            setFiles([]);

        } catch (error) {
            console.error(error);
            toast({
                title: "Upload Failed",
                description: "Could not upload files to the AI Knowledge Base.",
                variant: "destructive"
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Knowledge Base Upload</h2>
                    <p className="text-muted-foreground">Upload documents (PDFs, PPTs) to train your AI Tutor.</p>
                </div>
                <Link to="/student-app/my-courses">
                    <Button variant="outline" className="gap-2">
                        View My Courses <ExternalLink className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-3xl p-10 text-center border-dashed hover:border-primary/50 transition-colors">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Drag & Drop or Click to Upload</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Supported files: PDF, PPTX, DOCX. These will be processed and added to the RAG vector database.
                </p>

                <input
                    type="file"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                <Button
                    size="lg"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-full px-8"
                >
                    Select Documents
                </Button>
            </div>

            {files.length > 0 && (
                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                    <h4 className="font-semibold mb-4">Selected Files ({files.length})</h4>
                    <div className="space-y-3">
                        {files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <File className="w-5 h-5 text-primary" />
                                    <span className="text-sm">{file.name}</span>
                                    <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeFile(idx)} className="h-8 w-8 text-red-400 hover:text-red-300">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="w-full sm:w-auto"
                        >
                            {isUploading ? "Uploading & Processing..." : "Upload to AI Knowledge Base"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
