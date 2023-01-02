import React from 'react';
import './AppHeader.css';
import { Navbar } from './Navbar';

export interface HeaderProps {
    changePage(newPage: number): void;
    title: String;
    isUserInterface: boolean;
}
export const Header: React.FC<HeaderProps> = ({
    changePage,
    title,
    isUserInterface
}) => {
    return (
        isUserInterface?
        <div>
            <div className='header-container-user-interface'>
                <h1 className='app-header'> {title} </h1>
                <div className='space container-user-interface'>
                    <Navbar changePage={changePage} isUserInterface={isUserInterface} />
                    <div className='user-circle'>〇</div>
                </div>
            </div>
        </div>
        :
        <div>
            <div className='header-container-backoffice'>
                <h1 className='app-header'> {title} </h1>
                <div className='space container-backoffice'>
                    <Navbar changePage={changePage} isUserInterface={isUserInterface} />
                    <div className='user-circle'>〇</div>
                </div>
            </div>
        </div>
    )
}