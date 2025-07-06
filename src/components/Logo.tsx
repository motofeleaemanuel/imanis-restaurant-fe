import Image from 'next/image';
import React from 'react'

const Logo = () => {
  return (
    // <div className="flex items-center text-2xl font-heading font- font-bold text-primary transition hover:text-primary">
    //   <div className="mr-2">☕️</div>
    //   <div className="flex flex-col items-center justify-center leading-none">
    //     <div className="border-y-2 border-primary">IMANIS</div>
    //     <div className="text-[0.65rem] tracking-[0.32em] uppercase mt-[2px]">CAFETERIA</div>
    //   </div>
    // </div>
    <div className="flex items-center text-2xl font-heading font- font-bold text-primary transition hover:text-primary">
      <Image
        src="/images/logo-no-bg-crop.png"
        alt="Imani's Restaurant Logo"
        width={100}
        height={100}
        className="rounded-full"
      />
    </div>
  );
};

export default Logo;