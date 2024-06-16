import { ScissorOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import CutImage from '../../assets/cutImage.png';

const ShotScreenCard = forwardRef((props: any, ref: any) => {
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
        width: '271px',
        margin: '0 auto',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column'
      }}
      onClick={handleCutScreen}
    >
      <img style={{ width: '85px', height: '54px', marginTop: "27px" }} src={CutImage} alt="" />
      <div
        style={{
          color: '#fff',
          marginTop: "22px"
        }}
      >
        {t('home.screenshot')}
      </div>
    </div>
  );
});

export default ShotScreenCard;
