import { VideoCameraOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';

const RecordVideoCard = forwardRef((props: any, ref: any) => {
  useImperativeHandle(ref, () => ({ setIsRecordVideo }));

  const { t } = useTranslation();

  const [isRecordVideo, setIsRecordVideo] = useState(true);

  function handleRecorderVideo() {
    window.isElectron
      ? window.electronAPI.sendRvOpenWin()
      : (location.href = '/recorderVideo.html');
  }

  function handleCanvasClick(e) {
    window.isElectron ? window.electronAPI.sendCaOpenWin() : (location.href = '/canvas.html');

    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div className="cardContent">
      <span className="extra" onClick={handleCanvasClick}>
        {t('home.canvas')}
      </span>
      <div className="cardContent">
        <VideoCameraOutlined onClick={handleRecorderVideo} />
        <div className="cardTitle">{t('home.videoRecording')}</div>
      </div>
    </div>
  );
});

export default RecordVideoCard;
