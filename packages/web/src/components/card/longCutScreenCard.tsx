import { ScissorOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import LongCut from '../../assets/longCut.png';

const LongShotScreenCard = forwardRef((props: any, ref: any) => {
  useImperativeHandle(ref, () => ({
    handleCutScreen,
  }));

  const { t } = useTranslation();

  function handleCutScreen() {
    if (window.electronAPI) {
      window.electronAPI.sendSsStartWin();
    } else {
      location.href = '/shotScreen.html';
    }
  }

  return (
    <div
      style={{
        width: '160px',
        margin: '0 auto',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column'
      }}
      onClick={handleCutScreen}
    >
      <img style={{ marginTop: '22px' }} src={LongCut} alt="" />
      <div style={{ color: '#fff', marginTop: '12px' }}>{t('home.longscreenshot')}</div>
    </div>
  );
});

export default LongShotScreenCard;
