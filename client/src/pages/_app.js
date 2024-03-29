import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { ProgramWrapper } from '../contexts/programContextProvider';
import { ThemeProvider } from "next-themes";
import 'animate.css';
import { NotifierContextProvider } from 'react-headless-notifier';


function MyApp({ Component, pageProps }) {

  return (
      <ThemeProvider enableSystem={true} attribute="class">
          <ProgramWrapper>
            <NotifierContextProvider
              // All props are optional, those are the values by default
              config={{
                max: null, // Max number of notiication simultaneously, `null` will result in no maximum
                duration: 5000, // Duration by notification in milliseconds
                position: 'bottomRight', // Default position for all the notification if it's not specify when using `notify()`, valid positions are 'top', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft', 'bottom'.
              }}
            >
                <Component {...pageProps} />
            </NotifierContextProvider>
</ProgramWrapper>
      </ThemeProvider>
  );
}

export default MyApp;
