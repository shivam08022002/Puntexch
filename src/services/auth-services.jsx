import api from "./api";
import TokenService from "./token-service";

class AuthServices {
  async login(userId, password) {
    try {
      const response = await api.post("login/gamma/authenticate", {
        userId,
        password
      });
      TokenService.setUser(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout(role) {
    TokenService.removeUser(role);
  }

  async register(name, fixLimit, myMatchShare, othersMatchShare,
    othersMatchCommission, sessionCommission, password, registerType, registerBy) {
    try {
      const response = await api.post("alpha/addAgent", {
        name,
        fixLimit,
        myMatchShare,
        othersMatchShare,
        othersMatchCommission,
        sessionCommission,
        password,
        registerType,
        registerBy
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deposit(agentName, balance, password, role) {
    try {
      const tailURL = role === "agent" ? "beta/depositAmount" : "alpha/depositAmount";
      const response = await api.post(tailURL, {
        agentName,
        balance,
        password
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async withdraw(agentName, balance, password, role) {
    try {
      const tailURL = role === "agent" ? "beta/withdrawAmount" : "alpha/withdrawAmount";
      const response = await api.post(tailURL, {
        agentName,
        balance,
        password
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(oldPassword, newPassword, userId, role) {
    try {
      const response = await api.post("login/gamma/setFirstPassword", {
        oldPassword,
        newPassword,
        userId
      }, { role });
      TokenService.setUser(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async changePasswordProfile(oldPassword, newPassword, role) {
    try {
      const response = await api.post("login/gamma/changePassword", {
        oldPassword,
        newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async placeBet(userId, gameId, amount, rate, betType, betCandidate) {
    try {
      const response = await api.post("gamma/placeBet", {
        userId,
        gameId,
        amount,
        rate,
        betType,
        betCandidate
      }, { role: "user" });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async placeCricBet(marketId, betCandidate, amount, betType, rate, sessionYesValue, sessionNoValue) {
    try {
      const response = await api.post("gamma/placeBet", {
        marketId,
        betCandidate,
        amount,
        betType,
        rate,
        sessionYesValue,
        sessionNoValue
      }, { role: "user" });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async savePreBetPreferencesOnServer(pb1, pb2, pb3, pb4, pb5, pb6, pb7, pb8) {
    try {
      const userId = TokenService.getUserId();
      const response = await api.post("gamma/savePreBetPreference", {
        userId,
        pb1, pb2, pb3, pb4, pb5, pb6, pb7, pb8
      }, { role: "user" });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async block(userName, accountStatus, password, role) {
    try {
      let tailURL = "alpha/blockAgent";
      if (accountStatus === "BLOCKED") {
        tailURL = role === "agent" ? "beta/unblockUser" : "alpha/unblockAgent";
      } else {
        tailURL = role === "agent" ? "beta/blockUser" : "alpha/blockAgent";
      }
      const response = await api.post(tailURL, {
        userName,
        password
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async overrideResult(gameId, winner) {
    try {
      const user = TokenService.getUser('admin');
      const response = await api.post("alpha/override/result", {
        gameId,
        adminName: user.userName,
        winner
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async settle(userName, upiId, amount, role) {
    try {
      const tailURL = role === "agent" ? "beta/settleTransaction" : "alpha/settleTransaction";
      const response = await api.post(tailURL, {
        userName,
        upiId,
        amount
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async approveRecharge(id, rechargeState, role) {
    try {
      const tailURL = role === "agent" ? "beta/updateRechargeRequest" : "alpha/updateRechargeRequest";
      const response = await api.post(tailURL, {
        id,
        rechargeState
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async approveWithdraw(id, rechargeState, role, transactionNumber, message) {
    try {
      const tailURL = role === "agent" ? "beta/updateWithdrawRequest" : "alpha/updateWithdrawRequest";
      const response = await api.post(tailURL, {
        id,
        rechargeState,
        transactionNumber,
        message
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addMyUpi(name, upi, description, password, image, role) {
    try {
      const tailURL = role === "agent" ? "beta/addUpi" : "alpha/addUpi";
      const response = await api.post(tailURL, {
        name,
        upi,
        description,
        password,
        image
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async registerReferred(name, email, userName, agentCode, password, otp, tailURL) {
    try {
      const response = await api.post(tailURL, {
        name,
        email,
        userName,
        agentCode,
        password,
        otp
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteMyUpi(id, password, role) {
    try {
      const tailURL = role === "agent" ? "beta/deleteUpi" : "alpha/deleteUpi";
      const response = await api.post(tailURL, {
        id,
        password
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async notifyAllUsers(agentName, message, password, emailUser, role) {
    try {
      const tailURL = role === "agent" ? "beta/notifyAllUsers" : "alpha/notifyAllUsers";
      const response = await api.post(tailURL, {
        agentName,
        message,
        emailUser,
        password
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async notifyUser(agentName, userName, message, password, emailUser, role) {
    try {
      const tailURL = role === "agent" ? "beta/notifyUser" : "alpha/notifyUser";
      const response = await api.post(tailURL, {
        agentName,
        userName,
        message,
        emailUser,
        password
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthServices();