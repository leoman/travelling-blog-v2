import React from 'react';
import { DateTime } from 'luxon'
import { FooterWrapper, Links, FooterLink, TextWrapper, CopyRight } from './index.styled';

export const Footer: React.FC = (): React.ReactElement => (
  <FooterWrapper>
    <Links>
      <FooterLink to={'/'}>Home</FooterLink>
      <FooterLink to={'/posts'}>Articles</FooterLink>
    </Links>
    <TextWrapper>
      <CopyRight>© Copyright {DateTime.fromJSDate(new Date()).toFormat("y")} Blink.Dev Limited. All rights reserved.</CopyRight>
    </TextWrapper> 
  </FooterWrapper>
);
