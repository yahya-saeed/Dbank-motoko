import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currValue : Float = 100;
  // currValue := 100;

  stable var startingTime = Time.now();
  Debug.print(debug_show (startingTime));

  // startingTime := startingTime;

  Debug.print(debug_show (currValue));

  public func topUp(amount : Float) {
    currValue += amount;
    Debug.print(debug_show (currValue));
  };

  public func withdraw(amount : Float) {
    let tempValue : Float = currValue - amount;
    if (tempValue >= 0) {
      currValue -= amount;
      Debug.print(debug_show (currValue));
    } else {
      Debug.print("There is not enough amount for this operation");
    };
  };

  public query func checkBalance() : async Float {
    return currValue;
  };

  public func compound() {
    let currenTime = Time.now();
    let timeElapseNS = currenTime - startingTime;
    let timeElapseS = timeElapseNS / 1000000000;
    currValue := currValue * (1.01 ** Float.fromInt(timeElapseS));
    startingTime := currenTime;
  };

};
