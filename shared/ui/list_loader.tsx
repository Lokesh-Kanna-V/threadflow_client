 "use client";

 import LoadingSpinner from "./spinner";

 type ListLoaderProps = {
   text?: string;
 };

 export default function ListLoader({ text = "Loading..." }: ListLoaderProps) {
   return (
     <div className="flex w-full justify-center items-center min-h-40 py-8">
       <div className="flex items-center gap-3">
         <LoadingSpinner />
         {text && (
           <span className="text-sm text-gray-500 dark:text-gray-300">
             {text}
           </span>
         )}
       </div>
     </div>
   );
 }

