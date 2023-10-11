package aljo;
import java.util.Scanner;
public class palindrome {


			
			public static boolean isPalindrome(String str)
			{
				
				String rev = "";

				
				boolean ans = false;

				for (int i = str.length() - 1; i >= 0; i--) {
					rev = rev + str.charAt(i);
				}

				
				if (str.equals(rev)) {
					ans = true;
				}
				return ans;
			}
			public static void main(String[] args)
			{
				
				Scanner scan = new Scanner(System.in);
				System.out.println("Enter Word");
				String str = scan.nextLine().toLowerCase();

			
				boolean A = isPalindrome(str);
				System.out.println(A);
			}
		}


	


