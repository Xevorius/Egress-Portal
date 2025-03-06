import NoVNC from "@/components/blocks/NoVNC";

const HomePage = () => {
    return (
        <div style={{ height: "100vh" }}>
            <NoVNC
                host="your-server-ip"
                port="your-port"
                password="your-password"
                viewOnly={false}
                scale={true}
            />
        </div>
    );
};

export default HomePage;