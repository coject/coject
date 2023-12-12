import { FC } from "react";
import { ModalProps } from "@mui/material";
interface iModal extends ModalProps {
    setOpen?: any;
    title?: string;
}
export declare const Modal: FC<iModal>;
export {};
