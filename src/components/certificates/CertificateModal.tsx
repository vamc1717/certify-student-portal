
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CertificateView from './CertificateView';
import { Certificate } from '@/types/certificate';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal = ({ certificate, isOpen, onClose }: CertificateModalProps) => {
  if (!certificate) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl">
        <CertificateView certificate={certificate} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
