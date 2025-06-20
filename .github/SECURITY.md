# Security Policy

## Supported Versions

We take security seriously for CalC - Calculator Messenger App. The following versions are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Features

CalC is designed with privacy and security as core principles:

### 🔐 **Encryption**
- All messages are encrypted before local storage
- AES-256 encryption for sensitive data
- No plaintext storage of user messages

### 🏠 **Local Storage Only**
- No external servers or cloud storage
- All data remains on the user's device
- No network transmission of sensitive data

### 🔒 **Access Control**
- Secret code protection for messaging interface
- Auto-lock functionality
- Quick exit to calculator mode

### 🛡️ **Privacy Protection**
- No user tracking or analytics
- No external API calls for sensitive operations
- Zero data collection

## Reporting a Vulnerability

We appreciate security researchers and users who help keep CalC secure. If you discover a security vulnerability, please follow these steps:

### 📧 **Contact Information**
- **Email**: security@your-domain.com
- **Subject**: [SECURITY] CalC Vulnerability Report
- **Response Time**: We aim to respond within 48 hours

### 📝 **What to Include**
Please provide the following information:

1. **Description**: Clear description of the vulnerability
2. **Impact**: Potential impact and severity assessment
3. **Reproduction**: Step-by-step instructions to reproduce
4. **Environment**: Platform, browser, version information
5. **Evidence**: Screenshots, logs, or proof-of-concept (if safe)

### 🔍 **Vulnerability Categories**

#### **Critical Severity**
- Message encryption bypass
- Secret code bypass
- Data exfiltration vulnerabilities
- Remote code execution

#### **High Severity**
- Local data exposure
- Authentication bypass
- Privilege escalation
- Cross-site scripting (XSS)

#### **Medium Severity**
- Information disclosure
- Denial of service
- UI spoofing
- Input validation issues

#### **Low Severity**
- Minor information leaks
- UI/UX security improvements
- Documentation security issues

### 🚀 **Response Process**

1. **Acknowledgment** (48 hours)
   - Confirm receipt of your report
   - Assign tracking number
   - Initial assessment

2. **Investigation** (1-7 days)
   - Reproduce the vulnerability
   - Assess impact and severity
   - Develop fix strategy

3. **Resolution** (7-30 days)
   - Implement security fix
   - Test thoroughly
   - Prepare security update

4. **Disclosure** (After fix)
   - Release security update
   - Public disclosure (if appropriate)
   - Credit security researcher

### 🏆 **Recognition**

We believe in recognizing security researchers who help improve CalC:

- **Hall of Fame**: Listed in our security acknowledgments
- **CVE Assignment**: For qualifying vulnerabilities
- **Public Recognition**: With your permission
- **Swag**: CalC security researcher merchandise

### ❌ **Out of Scope**

The following are generally considered out of scope:

- Social engineering attacks
- Physical device access attacks
- Vulnerabilities in third-party dependencies (report to maintainers)
- Issues requiring physical access to unlocked devices
- Theoretical attacks without practical impact

### 🔒 **Responsible Disclosure**

We follow responsible disclosure principles:

- **No Public Disclosure**: Until fix is available
- **Coordinated Timeline**: Work together on disclosure
- **User Safety First**: Prioritize user security
- **Transparency**: Clear communication throughout

### 📚 **Security Resources**

- **Security Documentation**: [docs/security.md](docs/security.md)
- **Encryption Details**: [docs/encryption.md](docs/encryption.md)
- **Privacy Policy**: [PRIVACY.md](PRIVACY.md)
- **Security Checklist**: [docs/security-checklist.md](docs/security-checklist.md)

### 🛠️ **Security Tools**

We use various tools to maintain security:

- **Static Analysis**: ESLint security rules
- **Dependency Scanning**: npm audit
- **Code Review**: Security-focused reviews
- **Penetration Testing**: Regular security assessments

### 📞 **Emergency Contact**

For critical security issues requiring immediate attention:

- **Emergency Email**: emergency-security@your-domain.com
- **Response Time**: Within 24 hours
- **Escalation**: Direct to security team lead

## Security Best Practices for Users

### 🔐 **Protecting Your Secret Code**
- Choose a unique, memorable secret code
- Don't share your secret code with others
- Change your secret code regularly
- Use the auto-lock feature

### 📱 **Device Security**
- Keep your device locked when not in use
- Use device encryption if available
- Keep the app updated to latest version
- Be cautious on shared or public devices

### 🔒 **Privacy Protection**
- Regularly clear app data if needed
- Be aware of screen recording/sharing
- Use private browsing mode when possible
- Understand local storage implications

## Legal

This security policy is subject to our [Terms of Service](TERMS.md) and [Privacy Policy](PRIVACY.md). By reporting security vulnerabilities, you agree to these terms and our responsible disclosure process.

---

**Thank you for helping keep CalC secure! 🔐**

*Last updated: January 2024*