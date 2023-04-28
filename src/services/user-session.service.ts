class UserSessionService {
  private memoryData: {
    [key: string]: {
      state?: string
      accessToken?: string
    }
  }

  constructor() {
    this.memoryData = {}
  }

  public updateSession(
    session: string,
    data: { state?: string; accessToken?: string }
  ) {
    if (this.memoryData[session]) {
      this.memoryData[session] = {
        ...this.memoryData[session],
        ...data,
      }
    } else {
      this.memoryData[session] = {
        ...data,
      }
    }
  }

  public getSession(session: string) {
    return this.memoryData[session] || {}
  }
}

export const userSessionService = new UserSessionService()
