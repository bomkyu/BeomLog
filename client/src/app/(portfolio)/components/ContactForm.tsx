'use client';

import CustoMTextArea from '@/app/(blog)/components/Comment/CustomTextArea';
import Buttons from '@/app/component/Buttons';
import ConTactInput from '@/app/component/InputField/ConTactInput';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ConTactForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    // 폼 데이터 가져오기
    const formData = new FormData(form.current);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // 비어있는지 체크
    if (!name || !email || !message) {
      alert('모든 필드를 입력해주세요!');
      return;
    }

    emailjs
      .sendForm('service_beomlog', 'template_1lsk47s', form.current, {
        publicKey: '1sMC1fLPc3nnHVIbH',
      })
      .then(
        () => {
          alert('메시지가 성공적으로 전송되었습니다! 확인 후 연락드릴게요.');
          form.current?.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('전송에 실패했습니다. 다시 시도해주세요.');
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div className='flex flex-col w-[325px] p-8 gap-4 rounded-2xl border border-stroke-gray bg-white shadow-[0_10px_15px_-1px_rgba(0,0,0,0.1)]'>
        <ConTactInput label='성함' name='name' placeholder='홍길동' />
        <ConTactInput label='이메일' name='email' placeholder='example@co.kr' />
        <CustoMTextArea name='message' className='bg-light-gray2' />
        <Buttons btnType='primary'>보내기</Buttons>
      </div>
    </form>
  );
};
export default ConTactForm;
