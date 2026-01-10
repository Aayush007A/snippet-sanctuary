// import React from "react";
// import { Link } from "react-router-dom";

// const NotFound = () => {
//   return (
//     <>
//       {/* Added min-h-screen to force full height, and flex items-center to center content vertically */}
//       <section className="relative z-10 bg-primary min-h-screen w-full flex items-center justify-center overflow-hidden">
//         <div className="container mx-auto">
//           <div className="-mx-4 flex">
//             <div className="w-full px-4">
//               <div className="mx-auto max-w-[400px] text-center">
//                 <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
//                   404
//                 </h2>
//                 <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
//                   Oops! That page can’t be found
//                 </h4>
//                 <p className="mb-8 text-lg text-white">
//                   The page you are looking for may have been deleted
//                 </p>
//                 {/* Replaced <a> with <Link> for proper React routing */}
//                 <Link
//                   to="/"
//                   className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-primary"
//                 >
//                   Go To Home
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Background decorative elements */}
//         <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
//           <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
//           <div className="flex h-full w-1/3">
//             <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
//             <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
//           </div>
//           <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default NotFound;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileQuestion, Home, Terminal, Code2, Braces } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  // Background floating elements configuration
  const floatingElements = [
    { icon: Code2, x: "10%", y: "20%", delay: 0 },
    { icon: Terminal, x: "80%", y: "15%", delay: 1 },
    { icon: Braces, x: "20%", y: "80%", delay: 2 },
    { icon: FileQuestion, x: "75%", y: "70%", delay: 1.5 },
  ];

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden flex items-center justify-center">
      {/* 1. Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* 2. Spotlight Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-primary/5 pointer-events-none" />

      {/* 3. Floating Background Icons */}
      {floatingElements.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/10"
          initial={{ x: item.x, y: item.y, opacity: 0 }}
          animate={{ 
            y: [item.y, `calc(${item.y} - 20px)`, item.y],
            opacity: 1 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatType: "reverse", 
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          <item.icon className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>
      ))}

      {/* 4. Main Content Card */}
      <div className="relative z-10 container px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto bg-card/50 backdrop-blur-md border border-border p-12 rounded-3xl shadow-2xl"
        >
          {/* 404 Text */}
          <motion.h1 
            className="text-[80px] md:text-[120px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            404
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Snippet Not Found
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Looks like this code block got deleted or moved to another repository.
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="h-12 px-8 text-base gap-2 rounded-full shadow-lg hover:shadow-primary/25 transition-all">
              <Link to="/">
                <Home className="w-5 h-5" />
                Return to Dashboard
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;