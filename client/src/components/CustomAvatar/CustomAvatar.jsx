import { Phone } from "@mui/icons-material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Avatar, Badge} from "@mui/material";
import "./CustomAvatar.css";
import React from "react";

const CustomAvatar = ({ title, subtitle, src, phone }) => {
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
                        }}
                    >
                        <EmojiEmotionsIcon color="#fff" />
                    </div>
                }
            >
                <Avatar alt={title} src={src} style={{ width: 180, height: 180, border: "3px solid #fff" }} />
            </Badge>
            <div className="back"></div>
            <div className="title">{title}</div>
            {subtitle && <div className="subtitle">{subtitle}</div>}
            {phone && (
                <div className="phone">
                    <Phone color="primary" fontSize="1rem" /> {phone}
                </div>
            )}
        </div>
    );
};

export default CustomAvatar;
