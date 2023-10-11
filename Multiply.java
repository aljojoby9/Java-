 package aljo;
import java.util.Scanner;
 
public class Multiply 
{
	
   public static void main(String[] args)


    {
    	
        int i, j, k, rowF, rowS, colF, colS;
        int first[][] = new int[10][10];
        int second[][] = new int[10][10];
        int product[][] = new int[10][10];
 
        Scanner scanner = new Scanner(System.in);
 
        System.out.println("Enter Rows and Cols of First Matrix");
        rowF = scanner.nextInt();
        colF = scanner.nextInt();
 
        System.out.println("Enter Elements of First Matrix");
 
       
        for (i = 0; i < rowF; i++) {
        	
            for (j = 0; j < colF; j++) {
            	
                first[i][j] = scanner.nextInt();
            }
        }
 
        System.out.println("Enter Rows and Cols of Second Matrix");
        rowS = scanner.nextInt();
        colS = scanner.nextInt();
 
        System.out.println("Enter Elements of Second Matrix");
 
       
        for (i = 0; i < rowS; i++) {
            for (j = 0; j < colS; j++) {
                second[i][j] = scanner.nextInt();
            }
        }
 
    
        for (i = 0; i < rowF; i++) {
            for (j = 0; j < colF; j++) {
                for (k = 0; k < colS; k++) {
                    product[i][j] += first[i][k] * second[k][j];
                }
            }
        }
 
                System.out.println("Product Matrix");
                
        for (i = 0; i < rowF; i++) {
            for (j = 0; j < colS; j++) {
                System.out.print(product[i][j] + " ");
            }
            System.out.print("\n");
        }
    }
}
