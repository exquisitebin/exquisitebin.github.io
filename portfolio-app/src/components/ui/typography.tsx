export function TypographyH1({ 
    children, 
    className = "",
    ...props 
}: { 
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1 
            className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ${className}`}
            {...props}
        >
            {children}
        </h1>
    )
}

export function TypographyH2({ 
    children, 
    className = "",
    ...props 
}: { 
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2 
            className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
            {...props}
        >
            {children}
        </h2>
    )
}

export function TypographyH3({ 
    children, 
    className = "",
    ...props 
}: { 
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 
            className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
            {...props}
        >
            {children}
        </h3>
    )
}

export function TypographyH4({ 
    children, 
    className = "",
    ...props 
}: { 
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h4 
            className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
            {...props}
        >
            {children}
        </h4>
    )
}

export function TypographyP({ 
    children, 
    className = "",
    ...props 
}: { 
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p 
            className={`leading-7 not-first:mt-6 ${className}`}
            {...props}
        >
            {children}
        </p>
    )
}
