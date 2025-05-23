import React from 'react'
import Button from '../common/Button'
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from 'next-auth/react';
import { LOGIN_REDIRECT } from '@/routes';



export default function SocialAuth() {
  const handleOnClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      redirectTo: LOGIN_REDIRECT
    })
  }
  return (
    <div className="flex gap-2 flex-col md:flex-row w-full"> 
    <Button
      type="button"
      label="Continue with GitHub"
      iconType={<FaGithub size={18} />}
      onClick={() => handleOnClick('github')}
      className="w-full"  // Assure que le bouton occupe toute la largeur
    />
    <Button
      type="button"
      label="Continue with Google"
      iconType={<FaGoogle size={18} />}
      onClick={() => handleOnClick('google')}
      className="w-full"  // Assure que le bouton occupe toute la largeur
    />
  </div>
  )
}