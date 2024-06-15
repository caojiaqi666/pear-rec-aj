import ininitApp from '../../pages/main';
import { Layout } from 'antd';
import Close from '../../assets/close.png';
import Logo from '../../assets/logo1.png';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
const { Header, Content } = Layout;
const About = () => {
const {t} =useTranslation()

  const headerStyle: React.CSSProperties = {
    width: '100%',
    color: '#fff',
    height: 34,
    paddingInline: 10,
    lineHeight: '38px',
    backgroundColor: '#333333',
    display: 'flex',
    justifyContent: "right",
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 34px)',
    height: 'calc(100vh - 34px)',
    color: '#fff',
    backgroundColor: '#434343',
    flexDirection: 'column',
  };
  const closeWin = () => {
    window.electronAPI.sendAboutCloseWin();
  };
  const config = {
    softName: 'SnipTaker',
    version: '4.7.2',
  }
  return (
    <Layout>
      <Header className={styles.titlebar} style={headerStyle}>
        <div className={styles.btns}>
          <img className={styles.optIcon} onClick={() => closeWin()} src={Close} alt="Close" />
        </div>

      </Header>
      <Content style={contentStyle}>
        <div className={styles.header}>
          <img className={styles.logo} src={Logo} alt="" />
          <div className={styles.softName}>SnipTaker</div>
          <div className={styles.version}>Version：{config.version}</div>
        </div>
        <div className={styles.descWrap}>

          <div className={styles.desc}>{t('about.desc')}</div>
          <div className={styles.bottomDesc}>{t('about.bottomDesc')}</div>
        </div>
      </Content>
    </Layout>
  );
};

ininitApp(About);

export default About;
