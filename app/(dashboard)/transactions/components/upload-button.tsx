/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCSVReader } from "react-papaparse";

import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

interface UploadButtonProps {
  onUpload: (results: any) => void;
}

function UploadButton({ onUpload }: UploadButtonProps) {
  const { CSVReader } = useCSVReader();

  // TODO: Add a paywall
  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          {" "}
          <Upload className="mr-2 size-4" />
          Import
        </Button>
      )}
    </CSVReader>
  );
}

export default UploadButton;
