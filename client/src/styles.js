export const inputTextStyle = {
    backgroundColor: '#40414f', borderRadius: 2,
    input: {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #40414f inset",
            'WebkitTextFillColor': 'white'
        }
    },
    '& .MuiOutlinedInput-root': {
        fontFamily: 'TestSöhne-Buch, sans-serif !important',
        '&.Mui-focused fieldset': {
            borderColor: '#0da37f'
        },
        '&:hover fieldset': {
            borderColor: '#0da37f'
        }
    },
    '& .MuiInputLabel-root': {
        color: 'white',
        '&.Mui-focused': {
            color: '#0da37f',
        }
    },
};

export const inputTextColor = {
    style: {
        color: "white",
    }
};

export const textFont = {
    fontFamily: 'TestSöhne-Buch, sans-serif',
}

export const codeFont = {
    fontFamily: "Cascadia Mono, Courier New",
    padding: "16px",
    fontWeight: "bold",
}

export const buttonStyle = {
    position: "absolute",
    right: "15px",
    top: "18px",
    fontSize: 35,
    color: "#0da37f",
    '&:hover': {
        color: "#045846",
    }
}

export const nav = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

export const selectTextStyle = {
    backgroundColor: '#40414f', borderRadius: 2,
    '& .MuiSelect-select': {
        fontFamily: 'TestSöhne-Buch, sans-serif !important',

    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0da37f'
    }
    ,
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0da37f'
    },
    '& .MuiSelect-icon': {
        fill: '#0da37f'
    }
}
