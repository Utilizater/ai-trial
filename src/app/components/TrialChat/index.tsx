import React, { useEffect, useState, useRef } from 'react';
import { Typography, List, ListItem, Box } from '@mui/material';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
import VideoModal from '../ModalWithVideo';

interface Sender {
  type: string;
  name: string;
}

interface Message {
  sender: Sender;
  content: string;
  timestamp: string;
  responseTo?: {
    sender: Sender;
    content: string;
    timestamp: string;
  };
}

interface TrialChatProps {
  sseUrlBase: string;
  trialPrompt: string;
}

const TrialChat: React.FC<TrialChatProps> = ({ sseUrlBase, trialPrompt }) => {
  const { judgeName, prosecutorName } = useSelector(
    (state: RootState) => state.trial
  );
  // console.log('judgeName', judgeName);
  // console.log('prosecutorName', prosecutorName);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!trialPrompt) return;
    const params = new URLSearchParams({
      prompt: trialPrompt,
      ...(judgeName ? { judgeName } : {}),
      ...(prosecutorName ? { prosecutorName } : {}),
      prosecutorName,
    });
    const sseUrl = `${sseUrlBase}?${params.toString()}`;

    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      console.log('event', event);
      const data = JSON.parse(event.data);

      if (Array.isArray(data) && data.length > 0 && 'role' in data[0]) {
        console.log('Received initial trial structure:', data);
        return; // Ignore this message
      }

      if ('sender' in data && 'content' in data) {
        setMessages((prevMessages) => [...prevMessages, data as Message]);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      handleModalOpen();
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [sseUrlBase, trialPrompt]);

  const getSenderInfo = (sender: Sender) => {
    return `${sender.type}${sender.name ? ` (${sender.name})` : ''}`;
  };

  const isJudge = (sender: Sender) => {
    return sender.type.toLowerCase() === 'judge';
  };

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.headerContainer}>
          <Typography sx={styles.heading}>Process</Typography>
        </Box>

        <Box sx={styles.inputContainer}>
          <Box sx={styles.chatBox}>
            {messages.length == 0 ? (
              <>
                <Box sx={styles.scenarioTextBox}>
                  <Typography sx={styles.scenarioText}>Scenario</Typography>
                </Box>
              </>
            ) : (
              <>
                <List>
                  {messages.map((message, index) => (
                    <ListItem key={index}>
                      <Box sx={styles.messageContainer}>
                        {isJudge(message.sender) ? (
                          <Box sx={styles.judgeMessage}>
                            <Typography
                              variant='subtitle2'
                              sx={{ fontWeight: 'bold' }}>
                              Judge
                            </Typography>
                            <Typography variant='body2'>
                              {message.content}
                            </Typography>
                            <Typography
                              variant='caption'
                              sx={{ display: 'block', mt: 0.5 }}>
                              {new Date(message.timestamp).toLocaleString()}
                            </Typography>
                          </Box>
                        ) : (
                          <>
                            {message.responseTo && (
                              <Box sx={styles.judgeMessage}>
                                <Typography
                                  variant='subtitle2'
                                  sx={{ fontWeight: 'bold' }}>
                                  Judge
                                </Typography>
                                <Typography variant='body2'>
                                  {message.responseTo.content}
                                </Typography>
                                <Typography
                                  variant='caption'
                                  sx={{ display: 'block', mt: 0.5 }}>
                                  {new Date(
                                    message.responseTo.timestamp
                                  ).toLocaleString()}
                                </Typography>
                              </Box>
                            )}
                            <Box sx={styles.nonJudgeMessage}>
                              <Typography
                                variant='subtitle2'
                                sx={{ fontWeight: 'bold' }}>
                                {getSenderInfo(message.sender)}
                              </Typography>
                              <Typography variant='body2'>
                                {message.content}
                              </Typography>
                              <Typography
                                variant='caption'
                                sx={{ display: 'block', mt: 0.5 }}>
                                {new Date(message.timestamp).toLocaleString()}
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <div ref={messagesEndRef} />
              </>
            )}
          </Box>
        </Box>
      </Box>
      <VideoModal handleClose={handleModalClose} open={modalOpen} />
    </>
  );
};

export default TrialChat;
