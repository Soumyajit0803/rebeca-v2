import React from "react";
import {Card, Button, Space, Avatar } from 'antd'
import {CloseOutlined} from '@ant-design/icons'

const Coordinator = ({name, image, email, onClose, id}) => {
    return (
        <Card
            size="small"
            title={`Coordinator ${id + 1}`}
            key={id}
            extra={
                <Button
                    type="primary"
                    size="small"
                    icon={<CloseOutlined />}
                    danger
                    onClick={onClose}
                />
            }
        >
            <Space>
                <Avatar src={image} style={{ width: 56, height: 56 }}></Avatar>
                <div style={{ minWidth: 100 }}>
                    <h3>
                        {name}
                        <br />
                    </h3>
                    <span style={{ opacity: 0.6 }}>{email}</span>
                </div>
            </Space>
        </Card>
    );
};

export default Coordinator;
