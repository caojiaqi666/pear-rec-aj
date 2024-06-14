import ininitApp from '../../pages/main';
import { Layout } from 'antd';
import Close from '../../assets/close.png';
import Logo from '../../assets/logo1.png';
import styles from './index.module.scss';
const { Header, Content } = Layout;
const About = () => {


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
    minHeight: '100%',
    color: '#fff',
    backgroundColor: '#434343',
    flexDirection: 'column',
  };
  const closeWin = () => {
    window.electronAPI.sendAboutCloseWin();
  };
  const config = {
    logo: Logo,
    softName: 'SnipTaker',
    version: '4.7.2',
    desc: 'SnipTaker Technology Co.,Ltd is a hi-tech corporation, specialized in providing professional solutions for Windows, Mac. Our goal is not only to provide high quality products but also provide comfortable customer service.',
    bottomDesc: 'Coypright@2024 SnipTaker. All rights reserved.'
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
          <img className={styles.logo} src={config.logo} alt="" />
          <div className={styles.softName}>{config.softName}</div>
          <div className={styles.version}>Version：{config.version}</div>
        </div>
        <div className={styles.descWrap}>

          <div className={styles.desc}>{config.desc}</div>
          <div className={styles.bottomDesc}>{config.bottomDesc}</div>
        </div>
      </Content>
    </Layout>
  );
};

ininitApp(About);

export default About;
