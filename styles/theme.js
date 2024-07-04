import { extendTheme } from '@chakra-ui/react'

const styles = {
    global: {
        body: {
            bg: '#1B1714',
            height: '100vh',
        },
    },
}

// const components = {
   
// }

// const fonts = {
//     // heading: "'Inter', sans-serif;",
// }
// const colorScheme = {
//     // orangeRoom: '#d4b693',
// }
// const colors = {
//     // orangeRoom: '#d4b693',
//     // linksColor: '#FFD281',
// }

// const config = {
//     // initialColorMode: 'dark',
//     // useSystemColorMode: true,
// }

const theme = extendTheme({
    // config,
    styles,
    // components,
    // fonts,
    // colors,
    // colorScheme,
})
export default theme