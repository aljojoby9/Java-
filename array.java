import java.io.*;
import java.util.Scanner;
public class array
{
	public static void main(String[] args)
	{
		Scanner myObj = new Scanner(System.in);	
		int n,i,j,h;
		System.out.println("Enetr the number of rows");
		n = myObj.nextInt();
		h = myObj.nextInt();
		int ar[][]=new int[n][h];
		System.out.println("Enter the columns");
		for(i=0;i<n;i++)
		{ for(j=0;j<h;j++)
		{
		    ar[i][j] = myObj.nextInt();
		    }
		     	}
		    
		    for(i=0;i<n;i++)
		    {  
		    	for(j=0;j<h;j++)
		    {
			System.out.print(+ar[i][j]+" ");
		   
	
		
	
		}
		System.out.println("\n");
		
		
		
		
		
		
		}
		} 
		}
		
