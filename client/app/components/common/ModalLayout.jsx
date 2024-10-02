import React from "react";
import { ConfigProvider, Modal } from "antd";
import { useTheme } from "next-themes";


const ModalLayout = ({
  title = null,
  open = false,
  width = '70vw',
  setOpen,
  children,
  bgcolor,
}) => {
  const { theme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 20,
          // colorBgMask: 'rgba(0, 0, 0, 0.8)',
        },
        components: {
          Modal: {
            contentBg: bgcolor
              ? bgcolor
              : "#fff",
            colorIcon: "#212227",
          },
        },
      }}
    >
      <Modal
        zIndex={9999}
        className="modal-head w-full md:w-[70vw]"
        width={width}
        footer={false}
        title={title}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        style={{
          // backgroundImage: url('/images/image.png'),
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "20px",
        }}
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
};

export default ModalLayout;