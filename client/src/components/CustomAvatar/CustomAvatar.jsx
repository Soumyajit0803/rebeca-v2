import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Avatar, Badge} from "@mui/material";
import "./CustomAvatar.css";
import React from "react";

const CustomAvatar = ({ title, subtitle, src, phone, icon }) => {
    return (
        <div className="avatar">
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                badgeContent={
                    <div
                        style={{
                            padding: "0.3rem",
                            backgroundColor: "var(--primary)",
                            borderRadius: "50%",
                            width: "max-content",
                            height: "max-content",
                            position: 'relative',
                            zIndex: 10
                        }}
                    >
                        {icon || <EmojiEmotionsIcon color="#fff" />}
                    </div>
                }
            >
                <Avatar className="avatar-img" src={src} style={{ width: 170, height: 170, border: "3px solid #fff", zIndex: 1 }} />
            </Badge>
            <div className="back"></div>
            <div className="title">{title.toLowerCase()}</div>
            {subtitle && <div className="subtitle">{subtitle}</div>}
            {phone && (
                <div className="phone">
                    <PermContactCalendarIcon color="primary" sx={{fontSize: '1.3rem'}} /> {phone}
                </div>
            )}
        </div>
    );
};

export default CustomAvatar;
