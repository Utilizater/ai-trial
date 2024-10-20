import React, { useRef } from 'react';
import { Modal, Box } from '@mui/material';

interface VideoModalProps {
  open: boolean;
  handleClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ open, handleClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      videoRef.current.play(); // Play the video when metadata is loaded and videoRef is ready
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby='video-modal'>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}>
        <video
          ref={videoRef}
          width='100%'
          controls
          onLoadedMetadata={handleVideoLoaded}>
          <source
            src='https://files2.heygen.ai/aws_pacific/avatar_tmp/7dfa5fccba4b49bb95a4f95894211ed5/31e8d96b15124e458169c22f5b3e2425.mp4?Expires=1730066778&Signature=ku6aETK~I9j-94lDzJl4mp1q8~gKs4-BjZ-Gc~yMcjngJcZg9vEgikWoRasaUF~vDJL0~qdaJDFX8YEyckKVxYAbr0j-QOqqqVj5Ba68Wg91OnQJYBCTy3z4EqGGKHIlQxJfuEELNf816vbjcH50uKTAS2mtgkT-~-1oWPvChp6jFIQj1brmMocemmBNMmggdiMc-H1D3XskTL1NLpIdRrScpI5pPTeFVmLQHMQJoFaKvluf8Qq0Rifn3t4TTOWd3ofRxLPSorQKT3rzIRIPCgoUcQDXvEeg6OBsZqbDD4PxZylGqJql2gC6mn7YLdmvsjpWU3cI2hSF-EunYZEmhg__&Key-Pair-Id=K38HBHX5LX3X2H'
            type='video/mp4'
          />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Modal>
  );
};

export default VideoModal;
