import { FC, ReactNode } from 'react';
interface iModal {
    children?: ReactNode;
    modalState?: boolean;
}
export declare const Modal: FC<iModal>;
export {};
