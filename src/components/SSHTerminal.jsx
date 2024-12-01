import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

const SSHTerminal = ({ connectionStatus, ipAddress }) => {
    const terminalRef = useRef(null);

    useEffect(() => {
        // Initialize xterm and FitAddon
        const terminal = new Terminal({
            rows: 20,  // Define the number of rows visible
            cols: 80,  // Define the number of columns visible
            cursorBlink: true,  // Enable cursor blinking
        });

        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);

        // Attach terminal to the DOM
        terminal.open(terminalRef.current);
        fitAddon.fit();  // Adjust terminal size to the container

        console.log({connectionStatus})
        // Simulate SSH terminal connection and commands
        if (connectionStatus === 'connecting') {
            terminal.write(`Connecting to ${ipAddress}...\r\n`);
            setTimeout(() => {
                terminal.write('Connection established.\r\n');
                terminal.write('Welcome to the SSH terminal.\r\n');
                terminal.write('Type your commands below:\r\n');
            }, 2000);
        } else if (connectionStatus === 'connected') {
            terminal.write('You are connected to the server.\r\n');
        } else if (connectionStatus === 'failed') {
            terminal.write('Connection failed. Please check the IP address.\r\n');
        } else{
          terminal.write('Awaiting for connection...\r\n');
        }

        // Automatically resize the terminal if window is resized
        window.addEventListener('resize', () => fitAddon.fit());

        // Clean up on component unmount
        return () => {
            terminal.dispose();
            window.removeEventListener('resize', () => fitAddon.fit());
        };
    }, [connectionStatus, ipAddress]);

    return <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default SSHTerminal;
