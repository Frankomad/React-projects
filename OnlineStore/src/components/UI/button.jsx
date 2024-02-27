export default function Button({ children, textOnly, className, ...props }) {
    let cssClasses = "button";
    cssClasses += ` ${className}`;

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>)
}