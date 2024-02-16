interface Props {
    Icon: React.ElementType;
    heading: string;
    infoText: string;
}

const PalceHolder = ({ Icon, heading, infoText }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            {/* Render the icon dynamically */}
            <div className="flex flex-col items-center justify-center">
                <Icon size={80} className="p-4 border rounded-full text-primary" />
                <h4 className="mt-2 text-xl font-extrabold text-primary">{heading}</h4>
            </div>
            <p className="mt-2 font-medium text-secondary">
                When you share {infoText}, they will appear on your here.
            </p>
        </div>
    );
};

export default PalceHolder;
