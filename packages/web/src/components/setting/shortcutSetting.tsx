import { Form, Input, Button, Flex, Checkbox, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { db, defaultShortcut } from '../../db';

let tip = '';
const ShortcutSetting = (props) => {
  const { t, i18n } = useTranslation();
  const { user, setting } = props;
  const [form] = Form.useForm();
  const [shortcut, setShortcut] = useState<any>({
    // screenshot: 'Alt+Shift+Q',
    // videoRecording: 'Alt+Shift+V',
    // screenRecording: 'Alt+Shift+S',
    // audioRecording: 'Alt+Shift+A',
  });
  const [screenshotValidate, setScreenshotValidate] = useState<any>({
    validateStatus: 'success',
    errorMsg: '',
  });
  const [videoRecordingValidate, setVideoRecordingValidate] = useState<any>({
    validateStatus: 'success',
    errorMsg: '',
  });
  const [screenRecordingValidate, setScreenRecordingValidate] = useState<any>({
    validateStatus: 'success',
    errorMsg: '',
  });
  const [audioRecordingValidate, setAudioRecordingValidate] = useState<any>({
    validateStatus: 'success',
    errorMsg: '',
  });

  useEffect(() => {
    user.id && getShortcut(user.id);
  }, [user]);

  async function getShortcut(userId) {
    try {
      let shortcut = await db.shortcuts.where({ userId }).first();
      if (!shortcut) {
        shortcut = { userId, createdBy: userId, updatedBy: userId, ...defaultShortcut };
        await db.shortcuts.add(shortcut);
      }
      setShortcut({
        id: shortcut.id,
        screenshot: shortcut.screenshot,
        videoRecording: shortcut.videoRecording,
        screenRecording: shortcut.screenRecording,
        audioRecording: shortcut.audioRecording,
      });
      form.setFieldValue('screenshot', shortcut.screenshot);
      form.setFieldValue('videoRecording', shortcut.videoRecording);
      form.setFieldValue('screenRecording', shortcut.screenRecording);
      form.setFieldValue('audioRecording', shortcut.audioRecording);
    } catch (err) {
      console.log('getSetting', err);
    }
  }

  function setScreenshot(e) {
    const str = getShortKeys(e);
    form.setFieldValue('screenshot', str);
  }

  function setVideoRecording(e) {
    const str = getShortKeys(e);
    form.setFieldValue('videoRecording', str);
  }

  function setScreenRecording(e) {
    const str = getShortKeys(e);
    form.setFieldValue('screenRecording', str);
  }

  function setAudioRecording(e) {
    const str = getShortKeys(e);
    form.setFieldValue('audioRecording', str);
  }

  function handleScreenshotBlur(e) {
    let screenshotValidate = inputValidate('screenshot');
    setScreenshotValidate({ ...screenshotValidate });
  }

  function handleVideoRecordingBlur(e) {
    let videoRecordingValidate = inputValidate('videoRecording');
    setVideoRecordingValidate({ ...videoRecordingValidate });
  }

  function handleScreenRecordingBlur(e) {
    let screenRecordingValidate = inputValidate('screenRecording');
    setScreenRecordingValidate({ ...screenRecordingValidate });
  }

  function handleAudioRecordingBlur(e) {
    let audioRecordingValidate = inputValidate('audioRecording');
    setAudioRecordingValidate({ ...audioRecordingValidate });
  }

  function getShortKeys(e) {
    e.preventDefault();
    // ====== 禁止上下左右按键 =====
    const list = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Process'];
    if (list.includes(e.key)) return;
    let str = '';
    // 获取用户有没有按下特殊按键【'Control', 'Alt', 'Shift', 'Meta'】
    const auxiliaryKey = [
      e.ctrlKey ? 'Ctrl' : '',
      e.altKey ? 'Alt' : '',
      e.shiftKey ? 'Shift' : '',
      e.metaKey ? '\ue672' : '',
    ].filter((t) => t);
    const someKeys = ['Control', 'Alt', 'Shift', 'Meta'];
    // mac下禁止使用快捷键option
    let publicKey = someKeys.indexOf(e.key) < 0 ? e.key.toLocaleUpperCase() : '';
    if (window.isMac && e.altKey) {
      publicKey = '';
    }
    if (auxiliaryKey.length) {
      str = auxiliaryKey.join('+') + '+' + publicKey;
    } else {
      str = str.substring(0, str.lastIndexOf('+') + 1) + publicKey;
    }
    return str;
  }

  function inputValidate(input) {
    const str = form.getFieldValue(input) || '';
    const formatKeys = str.replace('\ue672', 'CommandOrControl');
    const keyArr = formatKeys.split('+');
    if (formatKeys && keyArr.slice(-1)[0].trim()) {
      let changes = {};
      changes[input] = formatKeys;
      db.shortcuts.update(shortcut.id, changes);
      window.electronAPI?.sendSeSetShortcut({
        name: input,
        key: formatKeys,
        oldKey: shortcut[input],
      });
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    } else {
      return {
        validateStatus: 'error',
        errorMsg: '设置错误',
      };
    }
  }

  function handleResetClick() {
    db.shortcuts.update(shortcut.id, { ...defaultShortcut });
    form.setFieldValue('screenshot', defaultShortcut.screenshot);
    form.setFieldValue('videoRecording', defaultShortcut.screenshot);
    // form.setFieldValue('screenRecording', defaultShortcut.screenRecording ?? '');
    // form.setFieldValue('audioRecording', defaultShortcut.audioRecording ?? '');
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const onFinish = (value) => {
    console.log("value", value)
    handleScreenshotBlur(null)
    handleScreenRecordingBlur(null);
    message.success(t('home.applySuccess'))
  }

  return (
    <div className="shortcutSetting">
      <Form form={form} {...formItemLayout} colon={false} onFinish={onFinish}>
        <Form.Item
          label={<span style={{ color: '#fff' }}>{t('home.screenshot')}:</span>}
          name="screenshot"
          validateStatus={screenshotValidate.validateStatus}
        >
          <Input
            style={{ width: '100%' }}
            onKeyDown={setScreenshot}
            // onBlur={handleScreenshotBlur}
          />
        </Form.Item>
        
        <Form.Item
          label={<span style={{ color: '#fff' }}>{t('home.screenRecording')}:</span>}
          name="screenRecording"
          validateStatus={screenRecordingValidate.validateStatus}
        >
          <Input
            style={{ width: '100%' }}
            onKeyDown={setScreenRecording}
            // onBlur={handleScreenRecordingBlur}
          />
        </Form.Item>
        {/* <Form.Item
          label={<span style={{ color: '#fff' }}>{t('home.audioRecording')}</span>}
          name="audioRecording"
          validateStatus={audioRecordingValidate.validateStatus}
          help={audioRecordingValidate.errorMsg || t('setting.tip')}
        >
          <Input
            className="audioRecordingInput"
            onKeyDown={setAudioRecording}
            onBlur={handleAudioRecordingBlur}
          />
        </Form.Item>
        {/* <Flex gap="small" wrap="wrap">
          <Button type="primary" className="resetBtn" danger onClick={handleResetClick}>
            {t('setting.reset')}
          </Button>
        </Flex> */}
        
          <Button
            type="primary"
            htmlType="submit"
            style={{
              background: '#D8D8D8',
              border: '1px solid #979797',
              padding: '0 42px',
              height: 30,
              color: '#181818',
              float: 'right',
              borderRadius: 16,
              marginTop: 8,
              marginRight: 12
            }}
          >
            Apply
          </Button>
      </Form>
    </div>
  );
};

export default ShortcutSetting;
