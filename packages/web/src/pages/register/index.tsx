import ininitApp from '../../pages/main';
import { Layout, Form, Input, Button, Modal } from 'antd';
import Close from '../../assets/close.png';
import Cancel from '../../assets/cancel.png';
import Confirm from '../../assets/confirm.png';
import Success from "../../assets/success.png";
import Warning from "../../assets/warning-circle.png";
import styles from './index.module.scss';
import type { FormProps } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { ipcRenderer } from 'electron';
import { useState } from 'react';
import { Local } from '@/util/storage';

const { Header, Content } = Layout;
type FieldType = {
  email?: string;
  licensekey?: string;
};
const Register = () => {
  const [loading, setLoading] = useState(false)
  const [isModalOpen, seTIsModalOpen] = useState(false);
  const [registerStatus, setRegisterStatus] = useState<number>();
  const { t, i18n } = useTranslation();
  const headerStyle: React.CSSProperties = {
    width: '100%',
    color: '#fff',
    height: 34,
    paddingInline: 10,
    lineHeight: '38px',
    backgroundColor: '#333333',
    display: 'flex',
    justifyContent: 'right',
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

  const tableRowBorderStyle: React.CSSProperties = {
    borderTop: '0.5px solid #5d5d5d',
  };

  const closeWin = () => {
    window.electronAPI.sendRegisterCloseWin();
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    request(values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const resConfig = {
    0: {
      title: t('register.successfulTitle'),
      icon: Success,
      desc: t('register.successfulDesc'),
    },
    1: {
      title: t('register.failedTitle'),
      icon: Warning,
      desc: t('register.fail1Desc'),
    },
    2: {
      title: t('register.failedTitle'),
      icon: Warning,
      desc: t('register.fail2Desc'),
    },
    3: {
      title: t('register.failedTitle'),
      icon: Warning,
      desc: t('register.fail3Desc'),
    },
    4: {
      title: t('register.failedTitle'),
      icon: Warning,
      desc: t('register.fail4Desc'),
    },
    5: {
      title: t('register.failedTitle'),
      icon: Warning,
      desc: t('register.fail5Desc'),
    },
    6: {
      title: t('register.failedTitle'),
      icon: Warning,
      desc: t('register.fail6Desc'),
    },
  };

  const request = async (values) => {
    try {
      setLoading(true)
      var agent = navigator.userAgent.toLowerCase();
      var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
      console.log("isMac", isMac)
      if (agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0) {
        console.log('这是windows32位系统');
      }
      if (agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0) {
        console.log('这是windows64位系统');
      }
      const res: any = await axios.get(
        `https://www.regserver3.com/admin/checkregister.php?pid=${isMac ? '4' : '3'}&email=${values.email}&license=${values.licensekey}&mac=4`,
        {
          timeout: 3000,
        },
      );

      if (res) {
        setRegisterStatus(res?.data);
        seTIsModalOpen(true);
        if (res?.data === 0) {
          Local.set('userActivated', true);
          Local.set("uEmail", values?.email)
          Local.set("uKey", values?.licensekey)
        } else {
          Local.set('userActivated', false);
        }
      }
      setLoading(false)
      console.log('res', res);
    } catch (err) {
      setLoading(false)
      console.log('err', err);
      setRegisterStatus(6);
      seTIsModalOpen(true);
      Local.set('userActivated', false);
    }
  };

  const getInitFormValue = () => {
    try {
      const uEmail = Local.get('uEmail') || null;
      const uKey = Local.get('uKey') || null;
      return {
        email: uEmail,
        licensekey: uKey
      }
    } catch(err) {
      return {}
    }
  }
  return (
    <Layout>
      <Header className={styles.titlebar} style={headerStyle}>
        <div className={styles.btns}>
          <img className={styles.optIcon} onClick={() => closeWin()} src={Close} alt="Close" />
        </div>
      </Header>
      <Content style={contentStyle}>
        <div className={styles.contentWrap}>
          <div className={styles.title}>{t('register.need')}</div>
          <div className={styles.titleDesc}>{t('register.thankYouDesc')}</div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.firstLine}>{t('register.Features')}</div>
              <div className={styles.normalLine}>{t('register.Unregister')}</div>
              <div className={styles.normalLine}>{t('register.Registered')}</div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.firstLine}>{t('register.TakeScreenshot')}</div>
              <div className={styles.normalLine}>
                <img src={Cancel} className={styles.icon} alt="" />
              </div>
              <div className={styles.normalLine}>
                <img src={Confirm} className={styles.icon} alt="" />
              </div>
            </div>
            <div className={styles.tableRow} style={tableRowBorderStyle}>
              <div className={styles.firstLine}>{t('register.RecordScreen')}</div>
              <div className={styles.normalLine}>
                <img src={Cancel} className={styles.icon} alt="" />
              </div>
              <div className={styles.normalLine}>
                <img src={Confirm} className={styles.icon} alt="" />
              </div>
            </div>
            <div className={styles.tableRow} style={tableRowBorderStyle}>
              <div className={styles.firstLine}>{t('register.EditImage')}</div>
              <div className={styles.normalLine}>
                <img src={Cancel} className={styles.icon} alt="" />
              </div>
              <div className={styles.normalLine}>
                <img src={Confirm} className={styles.icon} alt="" />
              </div>
            </div>
            <div className={styles.tableRow} style={tableRowBorderStyle}>
              <div className={styles.firstLine}>{t('register.CustomArea')}</div>
              <div className={styles.normalLine}>
                <img src={Cancel} className={styles.icon} alt="" />
              </div>
              <div className={styles.normalLine}>
                <img src={Confirm} className={styles.icon} alt="" />
              </div>
            </div>
          </div>

          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ marginTop: 27 }}
            initialValues={getInitFormValue()}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item<FieldType>
              label={<span style={{ color: '#FFFFFF', fontSize: 14 }}>{t('register.email')}</span>}
              name="email"
              rules={[{ required: true, message: 'The Email cannot be empty!' }]}
              className={styles.formItem}
              colon={false}
            >
              <Input
                style={{
                  background: '#333333',
                  border: '1px solid #474747',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={
                <span style={{ color: '#FFFFFF', fontSize: 14 }}>{t('register.LicenseKey')}</span>
              }
              name="licensekey"
              rules={[{ required: true, message: 'The license cannot be empty!' }]}
              className={styles.formItem}
              colon={false}
            >
              <Input
                style={{
                  background: '#333333',
                  border: '1px solid #474747',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </Form.Item>

            <div style={{float: 'right', marginBottom: 24}}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  background: '#D8D8D8',
                  borderRadius: 8,
                  border: '1px solid #979797',
                  padding: '0 42px',
                  color: '#181818',
                }}
                loading={loading}
                disabled={loading}
              >
                {t('register.Register')}
              </Button>
              <Button
                type="primary"
                style={{
                  background: '#0DCCBC',
                  borderRadius: 8,
                  border: '1px solid #0DCCBC',
                  padding: '0 42px',
                  marginLeft: '24px',
                }}
                onClick={() => window.open('https://www.sniptaker.com/buy.html')}
              >
                {t('register.BuyNow')}
              </Button>
            </div>
          </Form>
        </div>
      </Content>
      {isModalOpen && (
        <Modal
          title={resConfig?.[registerStatus]?.title}
          style={{
            width: '430px',
            height: '210px',
          }}

          styles={{
         header:{
          background:'#434343',
         },
         content:{
          background:'#434343',
         },
         footer:{
          background:'#434343',
         },
          }}
          open={isModalOpen}
          footer={[]}
          onCancel={() => seTIsModalOpen(false)}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexFlow: 'column wrap',

            }}
          >
            <img
              style={{ width: '28px', height: '28px', marginTop: 23}}
              src={resConfig?.[registerStatus]?.icon}
             />
            <p style={{ marginTop: 20,color:'white' }}>{resConfig?.[registerStatus]?.desc}</p>
            <Button
              style={{
                background: '#FF7301',
                borderRadius: '8px',
                alignSelf: 'flex-end',
                marginTop: '10px',
                color: '#fff',
              }}
              onClick={() => {
                if (registerStatus === 0) {
                  window.electronAPI.sendRegisterCloseWin();
                  window.electronAPI.sendMaOpenWin();
                }
                seTIsModalOpen(false)
              }}
            >
              ok
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

ininitApp(Register);

export default Register;
