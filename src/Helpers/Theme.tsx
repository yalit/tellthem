import {createTheme, Theme} from '@material-ui/core/styles';

export const useAppTheme = (): Theme => {
    return createTheme({
        palette: {
            primary: {
                light: '#b2fab4',
                main: '#81c784',
                dark: '#519657',
                contrastText: '#000',
            },
            secondary: {
                light: '#80d6ff',
                main: '#42a5f5',
                dark: '#0077c2',
                contrastText: '#fff',
            }
        }
    })
}