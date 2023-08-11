import { notification } from 'antd';

export function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    notification.open({
        message: 'Copied to clipboard!',
        className: 'success',
    });
}
