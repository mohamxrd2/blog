import React from "react";

type Props = {
  title: string;
  center?: boolean;
  lg?: boolean;
  md?: boolean;
};

export default function Hedding({ title, center = false, lg = false, md = false }: Props) {
  return (
   <div className={center? 'text-center' : 'text-start'}>
    {lg && <h1 className="font-bold text-4xl my-4">{title}</h1> }
    {md && <h2 className="font-bold text-3xl my-4">{title}</h2> }
    { !lg && !md && <h3 className="font-bold text-2xl my-4">{title}</h3> }

   </div>
  );
}
