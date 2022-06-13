import React from 'react';
import Image from 'next/image';
import Logo from '../../public/assets/Images/YBM-Logo.svg';

function SiteLogo() {
  return (
    <Image
      alt="branding"
      src={Logo}
      objectFit="contain"
      width={50}
      height={50}
      priority
      quality={25}
    />
  );
}

export default SiteLogo;
