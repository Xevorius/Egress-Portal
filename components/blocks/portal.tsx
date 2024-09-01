'use client'

import { auth } from "@/auth";
import UI from '@/lib/ui'


const Portal = () => {
    UI;
    return (
<>
            {/*
                noVNC example: simple example using default UI
                Copyright (C) 2019 The noVNC Authors
                noVNC is licensed under the MPL 2.0 (see LICENSE.txt)
                This file is licensed under the 2-Clause BSD license (see LICENSE.txt).

                Connect parameters are provided in query string:
            http://example.com/?host=HOST&port=PORT&encrypt=1
                or the fragment:
            http://example.com/#host=HOST&port=PORT&encrypt=1
                */}
            <title>Egress - Portal</title>
            <link rel="icon" type="image/x-icon" href="Egress-logo-s-ico" />
            <meta name="theme-color" content="#313131" />
            {/* Apple iOS Safari settings */}
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />
            {/* @2x */}
            <link
                rel="apple-touch-icon"
                sizes="40x40"
                type="image/png"
                href="portal/images/icons/novnc-ios-40.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="58x58"
                type="image/png"
                href="portal/images/icons/novnc-ios-58.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="80x80"
                type="image/png"
                href="portal/images/icons/novnc-ios-80.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="120x120"
                type="image/png"
                href="portal/images/icons/novnc-ios-120.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="152x152"
                type="image/png"
                href="portal/images/icons/novnc-ios-152.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="167x167"
                type="image/png"
                href="portal/images/icons/novnc-ios-167.png"
            />
            {/* @3x */}
            <link
                rel="apple-touch-icon"
                sizes="60x60"
                type="image/png"
                href="portal/images/icons/novnc-ios-60.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="87x87"
                type="image/png"
                href="portal/images/icons/novnc-ios-87.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="120x120"
                type="image/png"
                href="portal/images/icons/novnc-ios-120.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                type="image/png"
                href="portal/images/icons/novnc-ios-180.png"
            />
            {/* Stylesheets */}
            <link rel="stylesheet" href="portal/styles/base.css" />
            <link rel="stylesheet" href="portal/styles/input.css" />
            {/* Images that will later appear via CSS */}
            <link rel="preload" as="image" href="portal/images/info.svg" />
            <link rel="preload" as="image" href="portal/images/error.svg" />
            <link rel="preload" as="image" href="portal/images/warning.svg" />

            {/* <script src="portal/error-handler.js" defer></script>
            <script src="portal/ui.js" defer></script> */}

            <div id="noVNC_fallback_error" className="noVNC_center">
                <div>
                <div>noVNC encountered an error:</div>
                <br />
                <div id="noVNC_fallback_errormsg" />
                </div>
            </div>
            {/* noVNC Control Bar */}
            <div id="noVNC_control_bar_anchor" className="noVNC_vcenter">
                <div id="noVNC_control_bar">
                <div id="noVNC_control_bar_handle" title="Hide/Show the control bar">
                    <div />
                </div>
                <div className="noVNC_scroll">
                    <h1 className="noVNC_logo" translate="no">
                    <span>no</span>
                    <br />
                    VNC
                    </h1>
                    <hr />
                    {/* Drag/Pan the viewport */}
                    <input
                    type="image"
                    alt="Drag"
                    src="portal/images/drag.svg"
                    id="noVNC_view_drag_button"
                    className="noVNC_button noVNC_hidden"
                    title="Move/Drag Viewport"
                    />
                    {/*noVNC Touch Device only buttons*/}
                    <div id="noVNC_mobile_buttons">
                    <input
                        type="image"
                        alt="Keyboard"
                        src="portal/images/keyboard.svg"
                        id="noVNC_keyboard_button"
                        className="noVNC_button"
                        title="Show Keyboard"
                    />
                    </div>
                    {/* Extra manual keys */}
                    <input
                    type="image"
                    alt="Extra keys"
                    src="portal/images/toggleextrakeys.svg"
                    id="noVNC_toggle_extra_keys_button"
                    className="noVNC_button"
                    title="Show Extra Keys"
                    />
                    <div className="noVNC_vcenter">
                    <div id="noVNC_modifiers" className="noVNC_panel">
                        <input
                        type="image"
                        alt="Ctrl"
                        src="portal/images/ctrl.svg"
                        id="noVNC_toggle_ctrl_button"
                        className="noVNC_button"
                        title="Toggle Ctrl"
                        />
                        <input
                        type="image"
                        alt="Alt"
                        src="portal/images/alt.svg"
                        id="noVNC_toggle_alt_button"
                        className="noVNC_button"
                        title="Toggle Alt"
                        />
                        <input
                        type="image"
                        alt="Windows"
                        src="portal/images/windows.svg"
                        id="noVNC_toggle_windows_button"
                        className="noVNC_button"
                        title="Toggle Windows"
                        />
                        <input
                        type="image"
                        alt="Tab"
                        src="portal/images/tab.svg"
                        id="noVNC_send_tab_button"
                        className="noVNC_button"
                        title="Send Tab"
                        />
                        <input
                        type="image"
                        alt="Esc"
                        src="portal/images/esc.svg"
                        id="noVNC_send_esc_button"
                        className="noVNC_button"
                        title="Send Escape"
                        />
                        <input
                        type="image"
                        alt="Ctrl+Alt+Del"
                        src="portal/images/ctrlaltdel.svg"
                        id="noVNC_send_ctrl_alt_del_button"
                        className="noVNC_button"
                        title="Send Ctrl-Alt-Del"
                        />
                    </div>
                    </div>
                    {/* Shutdown/Reboot */}
                    <input
                    type="image"
                    alt="Shutdown/Reboot"
                    src="portal/images/power.svg"
                    id="noVNC_power_button"
                    className="noVNC_button"
                    title="Shutdown/Reboot..."
                    />
                    <div className="noVNC_vcenter">
                    <div id="noVNC_power" className="noVNC_panel">
                        <div className="noVNC_heading">
                        <img alt="" src="portal/images/power.svg" /> Power
                        </div>
                        <input
                        type="button"
                        id="noVNC_shutdown_button"
                        defaultValue="Shutdown"
                        />
                        <input
                        type="button"
                        id="noVNC_reboot_button"
                        defaultValue="Reboot"
                        />
                        <input type="button" id="noVNC_reset_button" defaultValue="Reset" />
                    </div>
                    </div>
                    {/* Clipboard */}
                    <input
                    type="image"
                    alt="Clipboard"
                    src="portal/images/clipboard.svg"
                    id="noVNC_clipboard_button"
                    className="noVNC_button"
                    title="Clipboard"
                    />
                    <div className="noVNC_vcenter">
                    <div id="noVNC_clipboard" className="noVNC_panel">
                        <div className="noVNC_heading">
                        <img alt="" src="portal/images/clipboard.svg" /> Clipboard
                        </div>
                        <p className="noVNC_subheading">
                        Edit clipboard content in the textarea below.
                        </p>
                        <textarea id="noVNC_clipboard_text" rows={5} defaultValue={""} />
                    </div>
                    </div>
                    {/* Toggle fullscreen */}
                    <input
                    type="image"
                    alt="Full Screen"
                    src="portal/images/fullscreen.svg"
                    id="noVNC_fullscreen_button"
                    className="noVNC_button noVNC_hidden"
                    title="Full Screen"
                    />
                    {/* Settings */}
                    <input
                    type="image"
                    alt="Settings"
                    src="portal/images/settings.svg"
                    id="noVNC_settings_button"
                    className="noVNC_button"
                    title="Settings"
                    />
                    <div className="noVNC_vcenter">
                    <div id="noVNC_settings" className="noVNC_panel">
                        <div className="noVNC_heading">
                        <img alt="" src="portal/images/settings.svg" /> Settings
                        </div>
                        <ul>
                        <li>
                            <label>
                            <input id="noVNC_setting_shared" type="checkbox" /> Shared
                            Mode
                            </label>
                        </li>
                        <li>
                            <label>
                            <input id="noVNC_setting_view_only" type="checkbox" /> View
                            Only
                            </label>
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li>
                            <label>
                            <input id="noVNC_setting_view_clip" type="checkbox" /> Clip to
                            Window
                            </label>
                        </li>
                        <li>
                            <label htmlFor="noVNC_setting_resize">Scaling Mode:</label>
                            <select id="noVNC_setting_resize" name="vncResize">
                            <option value="off">None</option>
                            <option value="scale">Local Scaling</option>
                            <option value="remote">Remote Resizing</option>
                            </select>
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li>
                            <div className="noVNC_expander">Advanced</div>
                            <div>
                            <ul>
                                <li>
                                <label htmlFor="noVNC_setting_quality">Quality:</label>
                                <input
                                    id="noVNC_setting_quality"
                                    type="range"
                                    min={0}
                                    max={9}
                                    defaultValue={6}
                                />
                                </li>
                                <li>
                                <label htmlFor="noVNC_setting_compression">
                                    Compression level:
                                </label>
                                <input
                                    id="noVNC_setting_compression"
                                    type="range"
                                    min={0}
                                    max={9}
                                    defaultValue={2}
                                />
                                </li>
                                <li>
                                <hr />
                                </li>
                                <li>
                                <label htmlFor="noVNC_setting_repeaterID">
                                    Repeater ID:
                                </label>
                                <input
                                    id="noVNC_setting_repeaterID"
                                    type="text"
                                    defaultValue=""
                                />
                                </li>
                                <li>
                                <div className="noVNC_expander">WebSocket</div>
                                <div>
                                    <ul>
                                    <li>
                                        <label>
                                        <input
                                            id="noVNC_setting_encrypt"
                                            type="checkbox"
                                        />{" "}
                                        Encrypt
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="noVNC_setting_host">Host:</label>
                                        <input id="noVNC_setting_host" />
                                    </li>
                                    <li>
                                        <label htmlFor="noVNC_setting_port">Port:</label>
                                        <input id="noVNC_setting_port" type="number" />
                                    </li>
                                    <li>
                                        <label htmlFor="noVNC_setting_path">Path:</label>
                                        <input
                                        id="noVNC_setting_path"
                                        type="text"
                                        defaultValue="websockify"
                                        />
                                    </li>
                                    </ul>
                                </div>
                                </li>
                                <li>
                                <hr />
                                </li>
                                <li>
                                <label>
                                    <input id="noVNC_setting_reconnect" type="checkbox" />{" "}
                                    Automatic Reconnect
                                </label>
                                </li>
                                <li>
                                <label htmlFor="noVNC_setting_reconnect_delay">
                                    Reconnect Delay (ms):
                                </label>
                                <input id="noVNC_setting_reconnect_delay" type="number" />
                                </li>
                                <li>
                                <hr />
                                </li>
                                <li>
                                <label>
                                    <input id="noVNC_setting_show_dot" type="checkbox" />{" "}
                                    Show Dot when No Cursor
                                </label>
                                </li>
                                <li>
                                <hr />
                                </li>
                                {/* Logging selection dropdown */}
                                <li>
                                <label>
                                    Logging:
                                    <select
                                    id="noVNC_setting_logging"
                                    name="vncLogging"
                                    ></select>
                                </label>
                                </li>
                            </ul>
                            </div>
                        </li>
                        <li className="noVNC_version_separator">
                            <hr />
                        </li>
                        <li className="noVNC_version_wrapper">
                            <span>Version:</span>
                            <span className="noVNC_version" />
                        </li>
                        </ul>
                    </div>
                    </div>
                    {/* Connection Controls */}
                    <input
                    type="image"
                    alt="Disconnect"
                    src="portal/images/disconnect.svg"
                    id="noVNC_disconnect_button"
                    className="noVNC_button"
                    title="Disconnect"
                    />
                </div>
                </div>
            </div>{" "}
            {/* End of noVNC_control_bar */}
            <div id="noVNC_hint_anchor" className="noVNC_vcenter">
                <div id="noVNC_control_bar_hint"></div>
            </div>
            {/* Status Dialog */}
            <div id="noVNC_status" />
            {/* Connect button */}
            <div className="noVNC_center">
                <div id="noVNC_connect_dlg">
                <p className="noVNC_logo" translate="no">
                    <span>no</span>VNC
                </p>
                <div>
                    <button id="noVNC_connect_button">
                    <img alt="" src="portal/images/connect.svg" /> Connect
                    </button>
                </div>
                </div>
            </div>
            {/* Server Key Verification Dialog */}
            <div className="noVNC_center noVNC_connect_layer">
                <div id="noVNC_verify_server_dlg" className="noVNC_panel">
                <form>
                    <div className="noVNC_heading">Server identity</div>
                    <div>
                    The server has provided the following identifying information:
                    </div>
                    <div id="noVNC_fingerprint_block">
                    <b>Fingerprint:</b>
                    <span id="noVNC_fingerprint" />
                    </div>
                    <div>
                    Please verify that the information is correct and press "Approve".
                    Otherwise press "Reject".
                    </div>
                    <div>
                    <input
                        id="noVNC_approve_server_button"
                        type="submit"
                        defaultValue="Approve"
                        className="noVNC_submit"
                    />
                    <input
                        id="noVNC_reject_server_button"
                        type="button"
                        defaultValue="Reject"
                        className="noVNC_submit"
                    />
                    </div>
                </form>
                </div>
            </div>
            {/* Password Dialog */}
            <div className="noVNC_center noVNC_connect_layer">
                <div id="noVNC_credentials_dlg" className="noVNC_panel">
                <form>
                    <div className="noVNC_heading">Credentials</div>
                    <div id="noVNC_username_block">
                    <label htmlFor="noVNC_username_input">Username:</label>
                    <input id="noVNC_username_input" />
                    </div>
                    <div id="noVNC_password_block">
                    <label htmlFor="noVNC_password_input">Password:</label>
                    <input id="noVNC_password_input" type="password" />
                    </div>
                    <div>
                    <input
                        id="noVNC_credentials_button"
                        type="submit"
                        defaultValue="Send Credentials"
                        className="noVNC_submit"
                    />
                    </div>
                </form>
                </div>
            </div>
            {/* Transition Screens */}
            <div id="noVNC_transition">
                <div id="noVNC_transition_text" />
                <div>
                <input
                    type="button"
                    id="noVNC_cancel_reconnect_button"
                    defaultValue="Cancel"
                    className="noVNC_submit"
                />
                </div>
                <div className="noVNC_spinner" />
            </div>
            {/* This is where the RFB elements will attach */}
            <div id="noVNC_container">
                {/* Note that Google Chrome on Android doesn't respect any of these,
                html attributes which attempt to disable text suggestions on the
                on-screen keyboard. Let's hope Chrome implements the ime-mode
                style for example */}
                <textarea
                id="noVNC_keyboardinput"
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="false"
                tabIndex={-1}
                defaultValue={""}
                />
            </div>
            <audio id="noVNC_bell">
                <source src="portal/sounds/bell.oga" type="audio/ogg" />
                <source src="portal/sounds/bell.mp3" type="audio/mpeg" />
            </audio>
        </>
    );
};

export default Portal