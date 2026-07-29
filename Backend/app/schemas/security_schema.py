from pydantic import BaseModel


class SecuritySettingsUpdate(BaseModel):
    mfa_enabled: bool
    session_timeout: int
    strong_password_policy: bool
    audit_logging: bool