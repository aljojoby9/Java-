

/*Name ; Aljo Joby
 * roll no. 08
 * Batch : S3 CSE B 
 * Experiment : Finding sum using methods 
 * Date: 11-10-2023
 */

package aljo;

import java.util.Scanner;
 class Add
 {
	 
 
		
	int sum(int a,int b)
		{
				int sum =a+b;
				return sum;
		}
 }
 public class SumProgram
 {
		 
		 public static void main(String[] args)
		 {		Add a = new Add();
			 	Scanner sc =new Scanner(System.in);
			  
				  System.out.println("Enter the numbers");
			  int x =sc.nextInt();
			  int y = sc.nextInt();
			  sc.close();
			  int total = a.sum(x,y);
			  System.out.println("The Sum of" +x+ "and"+y+"is" +total);
			  
			  
			  }
		 }
		
		
		
   				
