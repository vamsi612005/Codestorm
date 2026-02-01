import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Calendar, Settings, Bell, BookOpen, GraduationCap, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const StudentApp = () => {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) handleUpload(files);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleUpload(Array.from(e.target.files));
        }
    };

    const handleUpload = async (files: File[]) => {
        setIsUploading(true);
        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });

        try {
            const response = await fetch("/ingest-api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const result = await response.json();

            // Assuming result.created_collections contains the names/ids of processed files
            if (result.created_collections && result.created_collections.length > 0) {
                setUploadedFiles(prev => [...prev, ...result.created_collections]);
                toast.success("Files uploaded and processed successfully!");
            } else {
                toast.warning("Files uploaded but no collections created.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload files. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-grid-line bg-secondary/30 p-6 flex flex-col hidden lg:flex">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Neev.AI</span>
                </div>

                <nav className="space-y-2 flex-1">
                    {[
                        { icon: LayoutDashboard, label: "Dashboard", path: "/student-app", active: true },
                        { icon: BookOpen, label: "My Courses", path: "/student-app/my-courses" },
                        { icon: Calendar, label: "Schedule", path: "#" },
                        { icon: Bell, label: "Notifications", path: "#" },
                        { icon: Settings, label: "Settings", path: "#" },
                    ].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => item.path && navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-transparent border border-accent/20">
                        <h4 className="font-bold text-white mb-1">Premium Plan</h4>
                        <p className="text-xs text-muted-foreground mb-3">Expires in 12 days</p>
                        <Button size="sm" variant="secondary" className="w-full text-xs">Upgrade</Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="border-b border-grid-line p-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary border border-white/10" />
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-black mb-2">Upload Materials</h2>
                        <p className="text-muted-foreground text-lg">Upload your study materials to generate new courses.</p>
                    </div>

                    <div
                        className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all duration-300 ${isDragging
                                ? 'border-primary bg-primary/10 scale-[1.02]'
                                : 'border-white/10 bg-secondary/20 hover:border-primary/50'
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                            {isUploading ? (
                                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Upload className="w-8 h-8 text-primary" />
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">
                            {isUploading ? "Processing..." : "Drag & drop files here"}
                        </h3>
                        <p className="text-muted-foreground mb-8 text-center max-w-sm">
                            Supported formats: PDF, DOCX, TXT. <br />
                            We'll automatically generate course content from your files.
                        </p>

                        <input
                            type="file"
                            id="file-upload"
                            multiple
                            className="hidden"
                            onChange={handleFileSelect}
                            accept=".pdf,.docx,.txt"
                        />
                        <Button
                            disabled={isUploading}
                            onClick={() => document.getElementById('file-upload')?.click()}
                            className="gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Browse Files
                        </Button>
                    </div>

                    {uploadedFiles.length > 0 && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                            <h4 className="text-lg font-bold text-white mb-4">Recently Processed</h4>
                            <div className="grid gap-4">
                                {uploadedFiles.map((file, i) => (
                                    <div key={i} className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-center gap-3 text-green-200">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        <span className="font-medium capitalize">{file}</span>
                                        <span className="ml-auto text-xs opacity-60">Ready</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentApp;
