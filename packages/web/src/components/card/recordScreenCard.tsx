import { DesktopOutlined, DownOutlined } from '@ant-design/icons';
import RecordScreen from '../../assets/recordScreen.png';
import type { MenuProps } from 'antd';
import { Card, Dropdown, Space } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';

const RecordScreenCard = forwardRef((props: any, ref: any) => {
  useImperativeHandle(ref, () => ({}));
  const { t } = useTranslation();

  const items: MenuProps['items'] = [
    {
      label: '区域录屏',
      key: 'video',
    },
    {
      label: '录动图(GIF)',
      key: 'gif',
    },
    {
      label: '录全屏',
      key: 'full',
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key == 'full') {
      handleFullScreenClick();
    } else {
      handleClipScreenClick(key);
    }
  };

  function handleClipScreenClick(type) {
    if (window.isElectron) {
      window.electronAPI.sendCsOpenWin({ type });
      window.electronAPI.sendMaCloseWin();
    } else {
      location.href = `/recorderScreen.html?type=${type}`;
    }
  }

  function handleFullScreenClick() {
    if (window.isElectron) {
      window.electronAPI.sendRfsOpenWin();
      window.electronAPI.sendMaCloseWin();
    } else {
      location.href = '/recorderFullScreen.html';
    }
  }

  return (
    <div
      style={{
        width: '160px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      onClick={() => handleClipScreenClick('video')}
    >
      <img style={{ marginTop: '22px' }} src={RecordScreen} alt="" />
      <div style={{ color: '#fff', marginTop: '20px' }}>{t('home.screenRecording')}</div>
    </div>
  );
});

export default RecordScreenCard;
