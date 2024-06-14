import ininitApp from '../../pages/main';
import { Layout } from 'antd';
import Close from '../../assets/close.png';
import styles from './index.module.scss';
const { Header, Content } = Layout;
const Register = () => {


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
    window.electronAPI.sendRegisterCloseWin();
  };
  return (
    <Layout>
      <Header className={styles.titlebar} style={headerStyle}>
        <div className={styles.btns}>
          <img className={styles.optIcon} onClick={() => closeWin()} src={Close} alt="Close" />
        </div>

      </Header>
      <Content style={contentStyle}>Register</Content>
    </Layout>
  );
};

ininitApp(Register);

export default Register;
