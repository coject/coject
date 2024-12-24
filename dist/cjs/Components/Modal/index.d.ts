import { FC, ReactNode } from "react";
import { ModalProps } from "@mui/material";
interface iModal extends Omit<ModalProps, 'title'> {
    setOpen?: any;
    title?: string | ReactNode;
}
export declare const Modal: FC<iModal>;
export {};
