
type buttonProps = {
    type: "submit" | "button" | "reset",
    title: string,
}



export const Button = ({ type, title }: buttonProps) => {
    return (<button className="bg-blue-600 w-full p-4 rounded-md hover:bg-blue-500 transition-all duration-150 cursor-pointer text-white font-bold mb-4" type={type}>{title}</button>)
}
